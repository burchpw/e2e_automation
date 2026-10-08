import { test as baseTest, expect } from '@playwright/test';
import { TablePage } from '../page_objects/table_page.js';

// Fixture to load page object
const test = baseTest.extend({
    tablePage: async( { page }, use) => {
         const table_page = new TablePage(page);
         await use(table_page);
    }
});

test.describe('Table Page', () => {

    test('filters by language Java', async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.language_filter('Java').click();

        const languages = await tablePage.getColumnTextList('row_language');
        expect(languages.every(lang => lang === 'Java')).toBe(true);
    });

    test('filters by level beginner only',  async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.level_filter('Intermediate').click();
        
        await tablePage.level_filter('Advanced').click();

        const level = await tablePage.getColumnTextList('row_level');
        expect(level.every(level => level === 'Beginner')).toBe(true);
    });

    test('filters by minimum enrollment 10,000+', async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.minimum_enrollment().click();
        await tablePage.select_min_enrollment().ten_thousand.click();

        const enrollment = await tablePage.getColumnTextList('row_enrollment');
        expect(enrollment.every(enroll => enroll > 10000)).toBe(true);
    });

    test('filters by combined filters Python, Beginner, and 10,000+', async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.language_filter('Python').click();

        await tablePage.level_filter('Intermediate').click();
        await tablePage.level_filter('Advanced').click();

        await tablePage.minimum_enrollment().click();
        await tablePage.select_min_enrollment().ten_thousand.click();

        const languages = await tablePage.getColumnTextList('row_language');
        expect(languages.every(lang => lang === 'Python')).toBe(true);

        const level = await tablePage.getColumnTextList('row_level');
        expect(level.every(level => level === 'Beginner')).toBe(true);

        const enrollment = await tablePage.getColumnTextList('row_enrollment');
        expect(enrollment.every(enroll => enroll > 10000)).toBe(true);

        const id = await tablePage.getColumnTextList('row_id');
        expect(id).toHaveLength(1);
        expect(id).toContain('4824578')
    });

    test('filters by combined filters for no result', async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.language_filter('Python').click();

        await tablePage.level_filter('Beginner').click();

        await tablePage.minimum_enrollment().click();
        await tablePage.select_min_enrollment().ten_thousand.click();

        await expect(tablePage.no_data_msg()).toBeVisible(true)
    });

    test('resets filters with reset button', async ({ tablePage }) => {
        await tablePage.goto();
    
        await tablePage.language_filter('Java').click();

        const languages = await tablePage.getColumnTextList('row_language');
        expect(languages.every(lang => lang === 'Java')).toBe(true);

        await tablePage.reset_button().click();

        expect(tablePage.language_filter('any')).toBeChecked();

        expect(tablePage.level_filter('Beginner')).toBeChecked();
        expect(tablePage.level_filter('Intermediate')).toBeChecked();
        expect(tablePage.level_filter('Advanced')).toBeChecked();

        expect(tablePage.selected_enrollment()).toHaveText('Any');
    })

    test('sorts courses table by selected sort Enrollments ascending', async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.sort_select('Enrollments')

        const enrollment = await tablePage.getColumnTextList('row_enrollment');
        const enrollment_number = enrollment.map(Number)
        const enrollment_sorted = enrollment_number.sort((a, b) => a - b);

        expect(enrollment_number).toEqual(enrollment_sorted);
    })

    test('sorts course table by selected sort Course Name alphabetical', async ({ tablePage }) => { 
        await tablePage.goto();
        
        await tablePage.sort_select('Course Name')

        const course_name = await tablePage.getColumnTextList('row_course');
        const course_name_sorted = course_name.sort();

        expect(course_name).toEqual(course_name_sorted)

    })
})