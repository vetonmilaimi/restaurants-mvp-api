import { InvalidTimeString } from "../../utils/errors";

class TokenService {
  generateExpTime = (timeString: string) => {
    const match = timeString.match(/^(\d+)(s|m|h|d)$/);
    if (!match) {
      throw new InvalidTimeString();
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    let multiplier;

    switch (unit) {
      case "s":
        multiplier = 1000;
        break;
      case "m":
        multiplier = 60 * 1000;
        break;
      case "h":
        multiplier = 60 * 60 * 1000;
        break;
      case "d":
        multiplier = 24 * 60 * 60 * 1000;
        break;
      default:
        throw new InvalidTimeString();
    }

    const currentTime = new Date().getTime();
    const timeLater = new Date(currentTime + value * multiplier).getTime();
    return timeLater;
  };

  didTokenExpire = (tokenExp: number) => {
    return new Date().getTime() > tokenExp;
  };
}
export default TokenService;
