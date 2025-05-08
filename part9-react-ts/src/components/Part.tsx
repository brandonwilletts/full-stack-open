import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
	part: CoursePart
}

const Part = (props: PartProps) => {
	switch (props.part.kind) {
		case "basic":
			return (
				<div>
					<div><strong>{props.part.name} {props.part.exerciseCount}</strong></div>
					<div><em>{props.part.description}</em></div>
					<p></p>
				</div>
			)
		case "group":
			return (
				<div>
					<div><strong>{props.part.name} {props.part.exerciseCount}</strong></div>
					<div>project exercises {props.part.groupProjectCount}</div>
					<p></p>
				</div>
			)
		case "background":
			return (
				<div>
					<div><strong>{props.part.name} {props.part.exerciseCount}</strong></div>
					<div><em>{props.part.description}</em></div>
					<div>submit to {props.part.backgroundMaterial}</div>
					<p></p>
				</div>
			)
			case "special":
				return (
					<div>
						<div><strong>{props.part.name} {props.part.exerciseCount}</strong></div>
						<div><em>{props.part.description}</em></div>
						<div>requirements {props.part.requirements.join(", ")}</div>
						<p></p>
					</div>
				)
		default:
  		return assertNever(props.part);
	}
}

export default Part;