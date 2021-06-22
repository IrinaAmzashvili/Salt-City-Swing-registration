"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Classes",
      [
        {
          title: "Level 1 Lindy Hop: 6-Count",
          description:
            "Start from the very beginning, focusing on partner connection and 6-count patterns that are essential for any Lindy Hopper. Lets get you out on the dance floor! No experience or partner required.",
          date: "July - Wednesdays 7:00pm-8:00pm",
          cost: 45,
          image: "/classImages/36378340_10216838799225971_2708978462206459904_n.jpg",
        },
        {
          title: "Level 2 Lindy Hop: Connection and Musicality",
          description:
            "Take a deep dive into the lead/follow aspects of swing and mix up some of the different rhythmic structures that make up Lindy Hop! We'll work on getting your dancing dialed into the music AND with your connection to your partner.",
          date: "July - Wednesdays 7:00pm-8:00pm",
          cost: 45,
          image: "classImages/51096618_1214458502035629_6207766019616800768_o.jpg",
        },
        {
          title: "Level 1 Lindy Hop: 8-Count",
          description:
            "8-count is a crucial cornerstone of your Lindy Hop journey, focusing on partner connection and 8-count patterns, leading up to the swing out and more! This is your lindy hopper bread and butter. No partner or experience required!",
          date: "August - Wednesdays 7:00pm-8:00pm",
          cost: 45,
          image: "classImages/13661855_10155132540302942_8543154901952582279_o.jpg",
        },
        {
          title: "Level 2 Lindy Hop: The Swingout",
          description:
            "This is the Lindy Hop basic, and yet one of the most complicated moves to master. We could spend a year (or more) working on this, but we're going to condense it down to the most important parts for this month. We'll work on technique of the swingout, stylizations, and moves based on the swingout. No partner required. You must have either taken both beginner series classes to register for this class, or have experience dancing Lindy Hop and have some familiarity with the swing out already.",
          date: "August - Wednesdays 7:00pm-8:00pm",
          cost: 45,
          image: "classImages/36378340_10216838799225971_2708978462206459904_n.jpg",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Classes", null, {});
  },
};
