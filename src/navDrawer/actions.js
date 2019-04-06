export const SELECT_SEMESTER = "selectSemeseter";
export const SELECT_COURSE = "selectCourse";
export const SELECT_PAGE = "selectPage";
export const SELECT_ASSESSMENT = "selectAssessment";

export const selectCourse = (selectedCourseID) =>
{
	return {
		type: SELECT_COURSE,
		payload: selectedCourseID
	};
};

export const selectAssessment = (selectedAssessID) =>
{
	return {
		type: SELECT_ASSESSMENT,
		payload: selectedAssessID
	};
};

export const selectPage = (selectedPage) =>
{
	return {
		type: SELECT_PAGE,
		payload: selectedPage
	};
};

export const selectSemester = (selectedSemesterID) =>
{
	return {
		type: SELECT_SEMESTER,
		payload: selectedSemesterID
	};
};