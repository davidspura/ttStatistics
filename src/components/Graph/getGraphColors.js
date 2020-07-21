export default function getGraphColors(data) {
  switch (data.id) {
    case "ios":
      return "#00e6e6";
    case "android":
      return "#66ff99";
    case "web":
      return "#ffcc66";
    case "subs":
      return "#33ccff";
    case "trial":
      return "#ff66ff";
    case "renewal":
      return "#5cd65c";
    default:
      break;
  }
}
