import Parse from "parse";

Parse.initialize(process.env.REACT_APP_STAT_PARSE_APP_ID);
Parse.serverURL = process.env.REACT_APP_STAT_PARSE_SERVER_URL;
window.Parse = Parse;
