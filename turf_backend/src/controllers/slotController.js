const Slot = require("../models/Slot");
const Turf = require("../models/Turf");

// Get available slots for a turf on a specific date
exports.getSlotsByDate = async (req, res) => {
  try {
    const { turfId, date } = req.query;

    if (!turfId || !date) {
      return res.status(400).json({ 
        message: "turfId and date are required" 
      });
    }

    const slots = await Slot.find({ 
      turf: turfId, 
      date 
    })
    .populate("turf", "name pricePerHour")
    .sort({ startTime: 1 });

    res.json({ slots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate slots for a turf (Admin only)
exports.generateSlots = async (req, res) => {
  try {
    const { turfId, date, startTime, endTime } = req.body;

    // Verify turf exists
    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    // Delete existing slots for this turf and date
    await Slot.deleteMany({ turf: turfId, date });

    // Generate time slots
    const slots = [];
    const slotDuration = turf.slotDurationMinutes;
    const buffer = turf.bufferMinutes;
    
    let currentTime = startTime; // e.g., "06:00"
    const endTimeParts = endTime.split(":");
    const endMinutes = parseInt(endTimeParts[0]) * 60 + parseInt(endTimeParts[1]);

    while (true) {
      const [hours, minutes] = currentTime.split(":").map(Number);
      const currentMinutes = hours * 60 + minutes;
      
      if (currentMinutes >= endMinutes) break;

      const nextMinutes = currentMinutes + slotDuration;
      const nextHours = Math.floor(nextMinutes / 60);
      const nextMins = nextMinutes % 60;
      const nextTime = `${String(nextHours).padStart(2, "0")}:${String(nextMins).padStart(2, "0")}`;

      if (nextMinutes > endMinutes) break;

      slots.push({
        turf: turfId,
        date,
        startTime: currentTime,
        endTime: nextTime,
        status: "AVAILABLE"
      });

      currentTime = nextTime;
      
      // Add buffer time
      if (buffer > 0) {
        const bufferMinutes = nextMinutes + buffer;
        const bufferHours = Math.floor(bufferMinutes / 60);
        const bufferMins = bufferMinutes % 60;
        currentTime = `${String(bufferHours).padStart(2, "0")}:${String(bufferMins).padStart(2, "0")}`;
      }
    }

    const createdSlots = await Slot.insertMany(slots);
    
    res.status(201).json({ 
      message: "Slots generated successfully", 
      count: createdSlots.length,
      slots: createdSlots 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update slot status (Admin only)
exports.updateSlotStatus = async (req, res) => {
  try {
    const { status, blockedBy } = req.body;

    const slot = await Slot.findByIdAndUpdate(
      req.params.id,
      { status, blockedBy },
      { new: true }
    ).populate("turf", "name");

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.json({ message: "Slot updated successfully", slot });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete slot (Admin only)
exports.deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    res.json({ message: "Slot deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
