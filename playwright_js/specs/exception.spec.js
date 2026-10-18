import { test as baseTest, expect } from '@playwright/test';
import { ExceptionPage } from '../page_objects/exception_page.js';

// Fixture to load page object
const test = baseTest.extend({
    exceptionPage: async( { page }, use) => {
         const exceptionPage = new ExceptionPage(page);
         await use(exceptionPage);
    }
});

test.describe('Exception Page', () => {

    test('handles adding row', async ({ exceptionPage }) => {
        await exceptionPage.goto();
        // Not assigning to const since its used once
        await exceptionPage.row('1').addButton.click();
        
        await expect(exceptionPage.confirmationMessage()).toHaveText('Row 2 was added');
    });

    test('handles removing row', async ({ exceptionPage }) => {
        const firstRow = exceptionPage.row('1');
        const secondRow = exceptionPage.row('2');
        
        await exceptionPage.goto();

        await firstRow.addButton.click();

        await expect(exceptionPage.confirmationMessage()).toHaveText('Row 2 was added');

        await secondRow.removeButton.click();

        await expect(exceptionPage.confirmationMessage()).toHaveText('Row 2 was removed');
    });

    test('saves text to added row', async ({ exceptionPage }) => {
        const testText = 'Test Adding Row';
        const firstRow = exceptionPage.row('1');
        const secondRow = exceptionPage.row('2');
        
        await exceptionPage.goto();

        await firstRow.addButton.click();

        await expect(exceptionPage.confirmationMessage()).toHaveText('Row 2 was added');

        await secondRow.textField.fill(testText);

        await secondRow.saveButton.click();

        await expect(exceptionPage.confirmationMessage()).toHaveText('Row 2 was saved');

        await expect(secondRow.textField).toHaveValue(testText);
    });

    test('updates text on first row', async ({ exceptionPage }) => {
        const testText = 'Test Updating Text';
        const firstRow = exceptionPage.row('1');

        await exceptionPage.goto();

        await firstRow.editButton.click();

        await expect(firstRow.saveButton).toBeVisible();

        await firstRow.textField.fill(testText);

        await firstRow.saveButton.click();

        await expect(exceptionPage.confirmationMessage()).toHaveText('Row 1 was saved');

        await expect(firstRow.textField).toHaveValue(testText);
    });
  
     test('instructions removed when adding row', async ({ exceptionPage }) => {
        const firstRow = exceptionPage.row('1');
        
        await exceptionPage.goto();

        await expect(exceptionPage.instructionsText()).toHaveText('Push “Add” button to add another row');

        await firstRow.addButton.click();
        
        await expect(exceptionPage.confirmationMessage()).toHaveText('Row 2 was added');

        await expect(exceptionPage.instructionsText()).toHaveCount(0);
    });
});