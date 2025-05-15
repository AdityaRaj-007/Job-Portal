import { Application } from "../models/appplication-model.js";
import { Job } from "../models/job-model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;

    const { id: jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required!",
        success: true,
      });
    }

    const exsitingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (exsitingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job!",
        success: false,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication);

    await job.save();

    return res.status(201).json({
      message: "Application submitted successfully!",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "No application found!",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getApplicants = async (req, res) => {
  try {
    const { id: jobId } = req.params;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status: updatedStatus } = req.body;
    const applicationId = req.params.id;
    console.log(req);
    if (!updatedStatus) {
      return res.status(400).json({
        message: "Status is required!",
        success: false,
      });
    }

    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      return res.status(404).json({
        message: "Application not found!",
        success: false,
      });
    }

    application.status = updatedStatus.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully!",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
