import moment from "moment";

export function getDownloadData(statisticsData) {
  const formatData = statisticsData.map((stat) => {
    return {
      ios: stat.ios,
      android: stat.android,
      web: stat.web,
      createdAt: moment(stat.createdAt).calendar(null, {
        sameDay: "[Dnes]",
        // nextDay: "[Zítra]",
        nextWeek: "D dddd",
        lastDay: "[Včera]",
        lastWeek: "D dddd",
        sameElse: "D dddd",
      }),
    };
  });
  return formatData.reverse();
}

export function getSubsData(subsData) {
  const data = Object.entries(subsData);
  const today = data[0]?.[1];
  const yesterday = data[1]?.[1];

  const getCorrectValues = ({ day = [], condition }) => {
    const platforms = ["android", "ios", "web"];
    const systems = {
      android: 0,
      ios: 0,
      web: 0,
    };

    if (condition === "subs") {
      platforms.forEach((platform) => {
        day.forEach((value) => {
          if (
            value.platform === platform &&
            (value.productId.match("monthly") ||
              value.productId.match("yearly") ||
              value.productId.match("546772") ||
              value.productId.match("544756"))
          ) {
            systems[platform]++;
          }
        });
      });
    } else if (condition === "trials") {
      platforms.forEach((platform) => {
        day.forEach((value) => {
          if (value.platform === platform && value.isTrial === "true")
            systems[platform]++;
        });
      });
    } else if (condition === "renewal") {
      platforms.forEach((platform) => {
        day.forEach((value) => {
          if (value.platform === platform && value.renewal >= 1)
            systems[platform]++;
        });
      });
    }
    return {
      android: systems["android"],
      ios: systems["ios"],
      web: systems["web"],
    };
  };
  const todaySubs = getCorrectValues({ day: today, condition: "subs" });
  const yesterdaySubs = getCorrectValues({ day: yesterday, condition: "subs" });

  const todayTrials = getCorrectValues({ day: today, condition: "trials" });
  const yesterdayTrials = getCorrectValues({
    day: yesterday,
    condition: "trials",
  });

  const todayRenewal = getCorrectValues({ day: today, condition: "renewal" });
  const yesterdayRenewal = getCorrectValues({
    day: yesterday,
    condition: "renewal",
  });

  const getGraphSubsData = ({ dayToShow, sub, trial, renewal }) => {
    return {
      graphIndex: dayToShow,
      subs: sub?.android + sub?.ios + sub?.web,
      trial: trial?.android + trial?.ios + trial?.web,
      renewal: renewal?.android + renewal?.ios + renewal?.web,
    };
  };
  const graphSubsData = [
    getGraphSubsData({
      dayToShow: "včera",
      sub: yesterdaySubs,
      trial: yesterdayTrials,
      renewal: yesterdayRenewal,
    }),
    getGraphSubsData({
      dayToShow: "dnes",
      sub: todaySubs,
      trial: todayTrials,
      renewal: todayRenewal,
    }),
  ];
  const getAdditionalInfo = ({ sub, trial, renewal }) => {
    return [
      {
        "android subscriptions": sub?.android,
        "ios subscriptions": sub?.ios,
        "web subscriptions": sub?.web,
      },
      {
        "android trial": trial?.android,
        "ios trial": trial?.ios,
        "web trial": trial?.web,
      },
      {
        "android renewal": renewal?.android,
        "ios renewal": renewal?.ios,
        "web renewal": renewal?.web,
      },
    ];
  };

  const additionalInfoToday = getAdditionalInfo({
    sub: todaySubs,
    trial: todayTrials,
    renewal: todayRenewal,
  });

  const additionalInfoYesterday = getAdditionalInfo({
    sub: yesterdaySubs,
    trial: yesterdayTrials,
    renewal: yesterdayRenewal,
  });

  return { graphSubsData, additionalInfoToday, additionalInfoYesterday };
}
