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
