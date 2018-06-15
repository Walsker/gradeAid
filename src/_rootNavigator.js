// React Navigation imports
import {createDrawerNavigator} from 'react-navigation';

// Custom imports
import CoursePage from 'easyGrades/src/coursePage/coursePage';
import SemesterPage from 'easyGrades/src/semesterPage/semesterPage';

export default RootNavigator = createDrawerNavigator(
{
    Semester:
    {
        screen: SemesterPage
    }
},
{
    // These need to be explicitly defined
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle',
});