let numberBtns


beforeAll(async () => {
    await page.goto('https://www.google.co.il/search?q=google+calculator', { waitUntil: 'domcontentloaded' });
    numberBtns = await page.$$('.AOvabd')
});

describe('Test page title and header', () => {

    test('calculate 5 + 10', async () => {
        const utilBtns = await page.$$('.MEdqYd')
        const equalsBtn = await page.$('.UUhRt')

        // press 5 
        await numberBtns[4].click()

        // press +
        await utilBtns[29].click()

        // press 10
        await numberBtns[6].click()
        await numberBtns[9].click()

        // press =
        await equalsBtn.click()

        const resultEl = await page.waitForSelector('.qv3Wpe')
        const resultElValue = await resultEl.evaluate(el => el.textContent)

        expect(resultElValue).toBe('15')
    });


    test('count buttons with numbers', async () => {
        const buttonsWithNumbers = numberBtns.length - 1
        expect(buttonsWithNumbers).toBe(10)
    })

    test('count calculator buttons', async () => {
        const buttons = await page.evaluate(() => {

            const buttons = Array.from(document.querySelectorAll('.XRsWPe'))

            // returning without invisible buttons
            return buttons.filter(button => button.style.display !== 'none')
        })

        expect(buttons.length).toBe(34)
    })

});


