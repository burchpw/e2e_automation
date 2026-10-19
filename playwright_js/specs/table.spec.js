import { test as baseTest, expect } from '@playwright/test';
import { TablePage } from '../page_objects/table_page.js';

// Fixture to load page object
const test = baseTest.extend({
    tablePage: async( { page }, use) => {
         const tablePage = new TablePage(page);
         await use(tablePage);
    }
});

test.describe('Table Page', () => {

    test('filters by language Java', async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.languageFilter('Java').click();

        const languages = await tablePage.getColumnTextList('rowLanguage');
       await expect(languages.every(lang => lang === 'Java')).toBe(true);
    });

    test('filters by level beginner only',  async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.levelFilter('Intermediate').click();
        
        await tablePage.levelFilter('Advanced').click();

        const level = await tablePage.getColumnTextList('rowLevel');
        await expect(level.every(level => level === 'Beginner')).toBe(true);
    });

    test('filters by minimum enrollment 10,000+', async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.minimumEnrollment().click();
        await tablePage.selectMinEnrollment().tenThousand.click();

        const enrollment = await tablePage.getColumnTextList('rowEnrollment');
        await expect(enrollment.every(enroll => enroll > 10000)).toBe(true);
    });

    test('filters by combined filters Python, Beginner, and 10,000+', async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.languageFilter('Python').click();

        await tablePage.levelFilter('Intermediate').click();
        await tablePage.levelFilter('Advanced').click();

        await tablePage.minimumEnrollment().click();
        await tablePage.selectMinEnrollment().tenThousand.click();

        const languages = await tablePage.getColumnTextList('rowLanguage');
        await expect(languages.every(lang => lang === 'Python')).toBe(true);

        const level = await tablePage.getColumnTextList('rowLevel');
        await expect(level.every(level => level === 'Beginner')).toBe(true);

        const enrollment = await tablePage.getColumnTextList('rowEnrollment');
        await expect(enrollment.every(enroll => enroll > 10000)).toBe(true);

        const id = await tablePage.getColumnTextList('rowId');
        await expect(id).toHaveLength(1);
        await expect(id).toContain('4824578')
    });

    test('filters by combined filters for no result', async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.languageFilter('Python').click();

        await tablePage.levelFilter('Beginner').click();

        await tablePage.minimumEnrollment().click();
        await tablePage.selectMinEnrollment().tenThousand.click();

        await expect(tablePage.noDataMsg()).toBeVisible(true)
    });

    test('resets filters with reset button', async ({ tablePage }) => {
        await tablePage.goto();
    
        await tablePage.languageFilter('Java').click();

        const languages = await tablePage.getColumnTextList('rowLanguage');
        await expect(languages.every(lang => lang === 'Java')).toBe(true);

        await tablePage.resetButton().click();

        await expect(tablePage.languageFilter('any')).toBeChecked();

        await expect(tablePage.levelFilter('Beginner')).toBeChecked();
        await expect(tablePage.levelFilter('Intermediate')).toBeChecked();
        await expect(tablePage.levelFilter('Advanced')).toBeChecked();

        await expect(tablePage.selectedEnrollment()).toHaveText('Any');
    })

    test('sorts courses table by selected sort Enrollments ascending', async ({ tablePage }) => {
        await tablePage.goto();

        await tablePage.sortSelect('Enrollments')

        const enrollment = await tablePage.getColumnTextList('rowEnrollment');
        const enrollmentNumber = enrollment.map(Number)
        const enrollmentSorted = enrollmentNumber.sort((a, b) => a - b);

        await expect(enrollmentNumber).toEqual(enrollmentSorted);
    })

    test('sorts course table by selected sort Course Name alphabetical', async ({ tablePage }) => { 
        await tablePage.goto();
        
        await tablePage.sortSelect('Course Name')

        const courseName = await tablePage.getColumnTextList('rowCourse');
        const courseNameSorted = courseName.sort();

        await expect(courseName).toEqual(courseNameSorted)
    })
})