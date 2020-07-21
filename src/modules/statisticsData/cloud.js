import Parse from "parse";

export async function getStats() {
  const parseStats = await Parse.Cloud.run("getStats");
  return parseStats.map((parseStat) => {
    const stat = parseStat.toJSON();
    return stat;
  });
}

export async function getSubs() {
  const parseSubs = await Parse.Cloud.run("getSubscriptionStats");
  const parseData = (day) => {
    return parseSubs[day].map((data) => {
      return {
        isTrial: data.get("isTrial"),
        productId: data.get("productId"),
        platform: data.get("platform"),
        renewal: data.get("renewal"),
      };
    });
  };
  return { today: parseData("today"), yesterday: parseData("yesterday") };
}
