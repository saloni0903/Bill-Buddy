const Subscription = require('../models/Subscription');

const calc = async () => {
  const subs = await Subscription.find().sort({ date: 1 }).lean();
  let burnRate = 0;
  let alertCnt = 0;
  
  for (const sub of subs) {
    if (sub.status === 'Active') {
      burnRate += sub.cycle === 'Yearly' ? sub.cost / 12 : sub.cost;
    }
    const diff = Math.ceil((new Date(sub.date) - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff < 0) {
      sub.isOverdue = true;
    } else if (diff >= 0 && diff <= 7) {
      sub.isUrgent = true;
      alertCnt++;
    }
  }
  
  burnRate = Math.round(burnRate * 100) / 100;
  return { metrics: { burnRate, alertCnt }, subs };
};

exports.getDashboard = async (req, res) => {
  try {
    const data = await calc();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSub = async (req, res) => {
  try {
    const { name, cost, cycle, date } = req.body;
    if (!name || cost === undefined || !cycle || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (cost < 0) {
      return res.status(400).json({ error: 'Cost cannot be negative' });
    }
    const sub = new Subscription({ name, cost, cycle, date });
    await sub.save();
    const data = await calc();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleSub = async (req, res) => {
  try {
    const { id } = req.params;
    const sub = await Subscription.findById(id);
    if (!sub) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    sub.status = sub.status === 'Active' ? 'Paused' : 'Active';
    await sub.save();
    const data = await calc();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
