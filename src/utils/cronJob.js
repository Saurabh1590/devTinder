const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

// This job will run every day at 8 AM
cron.schedule("0 8 * * *", async () => {
  //send emails to all people who get requests the previous day

  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    for (const email of listOfEmails) {
      //Send Emails
      try {
        const res = await sendEmail.run(
          `New Pending Connection Requests for ${email}`,
          "There are so many new pending requests is available for you. Please login to devTinder and check it out."
        );
      } catch (err) {
        console.error("Error sending email:", err);
      }
    }
  } catch (err) {
    console.error("Error executing cron job:", err);
  }
});
