import { AiFillRead } from "react-icons/ai";
import readText from "../../lib/utils/text-reader";
export default function ReadAloud({ text }) {
    return (
        <AiFillRead
            onClick={() => { readText(text) }}
        />
    );
};
