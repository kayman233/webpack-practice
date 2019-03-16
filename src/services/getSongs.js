import exercises from "../configs/exercise";
import gammas from "../configs/gammas";

export default (gammaId, exerciseId, offset, settings) => {
    const gammaNotes = gammas(offset)[gammaId].notes;

    return exercises[exerciseId].exercise(gammaNotes, settings);
}
