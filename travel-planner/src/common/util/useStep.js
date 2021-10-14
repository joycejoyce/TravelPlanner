import { useDispatch } from "react-redux";
import { StepInfos } from "../../features/plan/PlanStepper";
import { toStep } from "../../features/plan/stepSlice";

export default function useStep(stepName) {
    const dispatch = useDispatch();

    const stepNum = StepInfos[stepName].num;
    dispatch(toStep(stepNum));
}