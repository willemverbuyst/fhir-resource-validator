import "./style.css";
import { validator } from "./validator";

validator(document.querySelector<HTMLButtonElement>("#validateBtn")!);
