interface CoursePartBase {
	name: string;
	exerciseCount: number;
	description?: string;
}

interface CoursePartBasic extends CoursePartBase {
	kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
	backgroundMaterial: string;
	kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
	requirements: ["nodejs", "jest"],
	kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;