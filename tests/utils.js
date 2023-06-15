export async function clickItemByTextNonIterable(elements, text, button, textToClick){ // USING non iterable locator()  - const elements = page.locator('.card-body') 
    for (let i = 0; i < await elements.count(); i++) {
        // console.log(await elements.nth(i).locator(text).textContent())
        textToClick.includes(await elements.nth(i).locator(text).textContent()) &&
            await elements.nth(i).locator(button).click()
    }
}

export async function selectDropOption(dropOptions, textToClick) {
    for (let i = 0; i < await dropOptions.count(); i++) {
        (await dropOptions.nth(i).textContent()).trim() === textToClick &&
            await dropOptions.nth(i).click()
        // break; NOT WORK WITH DROPDOWN
    }
}
 
export async function addItemByTextIterable(elements, textToClick) { // USING iterable $$  - const elements =  await page.$$('.card-body'); 
    for (const element of elements) {                 // must be after await page.waitForLoadState('networkidle') - on  new page
        await (await element.$('b')).textContent() === textToClick &&
            await (await element.$('.btn.w-10.rounded')).click();
    }
}

export async function elementsList(elements) { // USING non iterable locator()  - const elements = page.locator('.card-body') 
    let hashes = {}
    for (let i = 0; i < await elements.count(); i++) {
        hashes[await elements.nth(i).locator('b').textContent()] = await elements.nth(i).locator('.btn.w-10.rounded')
    }
    return hashes
}