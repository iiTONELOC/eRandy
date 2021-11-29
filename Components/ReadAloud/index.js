import { FaBookReader } from "react-icons/fa";
import readText from "../../lib/utils/text-reader";
export default function ReadAloud({ text }) {
    return (
        <FaBookReader
            onClick={() => { readText(text) }}
        />
    );
};
