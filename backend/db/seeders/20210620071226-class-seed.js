"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Classes",
      [
        {
          title: "Level 1 Lindy Hop: 6-Count",
          description:
            "Level 1 Swing (6-count) starts from the very beginning, focusing on partner connection and 6-count patterns that are essential for any Lindy Hopper. Topics for this class include, but are not limited to the 6-count basic, tuck turns, side passes, 6-count Lindy circle, arm-drape position entrance and exit, and Frankie 6's. No experience or partner required.",
          dates: "July - Wednesdays 7:00pm-8:00pm",
          startDate: '6/7/2021',
          cost: 45,
          image: "/images/classImages/classImage-1.jpg",
          imageAlt: 'A couple dancing Lindy Hop'
        },
        {
          title: "Level 2 Lindy Hop: Connection and Musicality",
          description:
            "Level 2 Connection and Musicality will take a deep dive into the lead/follow aspects of swing and mix up some of the different rhythmic structures that make up Lindy Hop! We'll work on getting your dancing dialed into the music AND with your connection to your partner.",
          dates: "July - Wednesdays 7:00pm-8:00pm",
          startDate: '6/7/2021',
          cost: 45,
          image: "/images/classImages/classImage-2.jpg",
          imageAlt: 'A couple dancing Lindy Hop'
        },
        {
          title: "Level 3 Lindy Hop",
          description:
            "Level 3 classes are for students who have completed both level 1 and level 2 series. If you read through the previous classes and say to yourself, \"psh, this is a breeze,\" then feel free to come talk to one of the instructors and see if this level is right for you. We teach whatever we think is fun and helpful in this series. It's a blast, we promise.",
          dates: "August - Wednesdays 7:00pm-8:00pm",
          startDate: '6/7/2021',
          cost: 45,
          image: "/images/classImages/classImage-3.jpg",
          imageAlt: 'A couple dancing Lindy Hop'
        },
        {
          title: "Level 1 Lindy Hop: 8-Count",
          description:
            "Level 1 Swing (8-count) is a crucial cornerstone of your Lindy Hop journey, focusing on partner connection and 8-count patterns. Topics for this class include, but are not limited to forward-and-back basics, flip-flops, lead goes, follow goes, Lindy circle, swing out, swing out with turns, macromusicality, and Frankie Points. This is your lindy hopper bread and butter.",
          dates: "August - Wednesdays 7:00pm-8:00pm",
          startDate: '8/4/2021',
          cost: 45,
          image: "/images/classImages/classImage-4.jpg",
          imageAlt: 'A couple dancing Lindy Hop'
        },
        {
          title: "Level 2 Lindy Hop: The Swingout",
          description:
            "Level 2 The Swingout is the Lindy Hop basic, and yet one of the most complicated moves to master. We could spend a year (or more) working on this, but we're going to condense it down to the most important parts for this month. We'll work on technique of the swingout, stylizations, and moves based on the swingout. No partner required. You must have either taken both beginner series classes to register for this class, or have experience dancing Lindy Hop and have some familiarity with the swing out already.",
          dates: "August - Wednesdays 7:00pm-8:00pm",
          startDate: '8/4/2021',
          cost: 45,
          image: "/images/classImages/classImage-5.jpg",
          imageAlt: 'A couple dancing Lindy Hop'
        },
        {
          title: "Level 3 Lindy Hop",
          description:
            "Level 3 classes are for students who have completed both level 1 and level 2 series. If you read through the previous classes and say to yourself, \"psh, this is a breeze,\" then feel free to come talk to one of the instructors and see if this level is right for you. We teach whatever we think is fun and helpful in this series. It's a blast, we promise.",
          dates: "August - Wednesdays 7:00pm-8:00pm",
          startDate: '8/4/2021',
          cost: 45,
          image: "/images/classImages/classImage-6.jpg",
          imageAlt: 'A couple dancing Lindy Hop'
        },
        {
          title: "Level 1 Charleston",
          description:
            "Level 1 Swing (Charleston) will get you moving on the dance floor, and here we're focusing on the dance that started it all. This dance is often interspersed within any social swing dance, or can be danced standalone. Charleston is the jelly to the Lindy Hop peanut butter. This basic also helps you dance to faster music, without feeling like you're working too hard--but you'll never feel like you're getting this much exercise when you're having so much fun! Topics for this class include, but are not limited to Charleston basic and connection, broken records, breakaway flip-flops, inside-out kicks, traveling basics, cross-hand inside-out kicks, skip ups, and more!",
          dates: "September - Wednesdays 7:00pm-8:00pm",
          startDate: '9/8/2021',
          cost: 45,
          image: "/images/classImages/classImage-7.jpg",
          imageAlt: 'A couple dancing Lindy Hop'
        },
        {
          title: "Level 2 Charleston",
          description:
            "Level 2 Swing (Charleston) will be starting from the connection and aesthetics of the basic, and moving quickly on to build on the technique and connection of other patterns in hand to hand and tandem Charleston as well. We cover Charleston patterns and connection in 6-count and 8-count (and more) in this series.",
          dates: "August - Wednesdays 7:00pm-8:00pm",
          startDate: '9/8/2021',
          cost: 45,
          image: "/images/classImages/classImage-8.jpg",
          imageAlt: 'A couple dancing Lindy Hop'
        },
        {
          title: "Level 3 Lindy Hop",
          description:
            "Level 3 classes are for students who have completed both level 1 and level 2 series. If you read through the previous classes and say to yourself, \"psh, this is a breeze,\" then feel free to come talk to one of the instructors and see if this level is right for you. We teach whatever we think is fun and helpful in this series. It's a blast, we promise.",
          dates: "August - Wednesdays 7:00pm-8:00pm",
          startDate: '9/8/2021',
          cost: 45,
          image: "/images/classImages/classImage-9.jpg",
          imageAlt: 'A couple dancing Lindy Hop'
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Classes", null, {});
  },
};
