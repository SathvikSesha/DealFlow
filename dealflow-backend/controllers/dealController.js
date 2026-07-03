import Deal from "../models/Deal.js";
import DealMember from "../models/DealMember.js";
import User from "../models/User.js";

export const createDeal = async (req, res) => {
  try {
    const { name, buyer_company, target_company, value, status } = req.body;
    const dealExists = await Deal.findOne({
      buyer_company,
      target_company,
      companyId: req.user.companyId,
    });

    if (dealExists) {
      return res
        .status(409)
        .json({ message: "This deal is already present in your workspace." });
    }
    const newDeal = await Deal.create({
      name,
      buyer_company,
      target_company,
      value,
      status,
      companyId: req.user.companyId,
    });
    res.status(201).json({
      message: "Deal created successfully",
      deal: newDeal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeals = async (req, res) => {
  try {
    let deals = [];
    if (req.user.role === "ADMIN" || req.user.role === "EXECUTIVE") {
      deals = await Deal.find({ companyId: req.user.companyId }).sort({
        createdAt: -1,
      });
    } else {
      const memberships = await DealMember.find({ userId: req.user._id });
      const assignedDealIds = memberships.map((member) => member.dealId);
      deals = await Deal.find({
        _id: { $in: assignedDealIds },
        companyId: req.user.companyId,
      }).sort({ createdAt: -1 });
    }
    return res.status(200).json(deals);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDeal = await Deal.findOneAndUpdate(
      { _id: id, companyId: req.user.companyId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedDeal) {
      return res
        .status(404)
        .json({ message: "Deal not found in your workspace." });
    }

    res.status(200).json({
      message: "Deal updated successfully",
      deal: updatedDeal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deal = await Deal.findOne({ _id: id, companyId: req.user.companyId });

    if (!deal) {
      return res
        .status(404)
        .json({ message: "Deal not found in your workspace." });
    }
    await deal.deleteOne();
    await DealMember.deleteMany({ dealId: id });

    res.status(200).json({
      message: "Deal and associated team assignments deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDealById = async (req, res) => {
  try {
    const { id } = req.params;
    const deal = await Deal.findOne({ _id: id, companyId: req.user.companyId });

    if (!deal) {
      return res
        .status(404)
        .json({ message: "Deal not found in your workspace." });
    }

    if (req.user.role !== "ADMIN" && req.user.role !== "EXECUTIVE") {
      const isAssigned = await DealMember.findOne({
        dealId: id,
        userId: req.user._id,
      });

      if (!isAssigned) {
        return res.status(403).json({
          message:
            "Access denied. You are not assigned to this deal workspace.",
        });
      }
    }

    const members = await DealMember.find({ dealId: id })
      .populate("userId", "name email role inviteStatus isActive")
      .sort({ assignedAt: -1 });
    res.status(200).json({
      deal,
      members,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
