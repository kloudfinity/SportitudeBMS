const Turf = require("../models/Turf");
const Venue = require("../models/Venue");

// Get all turfs
exports.getAllTurfs = async (req, res) => {
  try {
    const { venueId, sportType } = req.query;
    const filter = { isActive: true };
    
    if (venueId) {
      filter.venue = venueId;
    }
    
    if (sportType) {
      filter.sportType = sportType;
    }

    const turfs = await Turf.find(filter)
      .populate({
        path: "venue",
        populate: { path: "city", select: "name" }
      })
      .sort({ name: 1 });
    
    res.json({ turfs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get turf by ID
exports.getTurfById = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id)
      .populate({
        path: "venue",
        populate: { path: "city", select: "name" }
      });
    
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }
    
    res.json({ turf });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create turf (Admin only)
exports.createTurf = async (req, res) => {
  try {
    const { 
      venue, 
      name, 
      sportType, 
      pricePerHour, 
      slotDurationMinutes,
      bufferMinutes,
      amenities, 
      images 
    } = req.body;

    // Verify venue exists
    const venueExists = await Venue.findById(venue);
    if (!venueExists) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const turf = await Turf.create({
      venue,
      name,
      sportType,
      pricePerHour,
      slotDurationMinutes,
      bufferMinutes,
      amenities,
      images
    });

    const populatedTurf = await Turf.findById(turf._id)
      .populate({
        path: "venue",
        populate: { path: "city", select: "name" }
      });
    
    res.status(201).json({ 
      message: "Turf created successfully", 
      turf: populatedTurf 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update turf (Admin only)
exports.updateTurf = async (req, res) => {
  try {
    const { 
      venue, 
      name, 
      sportType, 
      pricePerHour,
      slotDurationMinutes,
      bufferMinutes, 
      amenities, 
      images, 
      isActive 
    } = req.body;

    if (venue) {
      const venueExists = await Venue.findById(venue);
      if (!venueExists) {
        return res.status(404).json({ message: "Venue not found" });
      }
    }

    const turf = await Turf.findByIdAndUpdate(
      req.params.id,
      { 
        venue, 
        name, 
        sportType, 
        pricePerHour,
        slotDurationMinutes,
        bufferMinutes, 
        amenities, 
        images, 
        isActive 
      },
      { new: true }
    ).populate({
      path: "venue",
      populate: { path: "city", select: "name" }
    });

    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    res.json({ message: "Turf updated successfully", turf });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete turf (Admin only)
exports.deleteTurf = async (req, res) => {
  try {
    const turf = await Turf.findByIdAndDelete(req.params.id);
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }
    res.json({ message: "Turf deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
