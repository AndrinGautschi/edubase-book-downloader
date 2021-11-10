# edubase-book-downloader
Very very basic puppeteer code that authenticates the user and navigates through a book in order to generate and store pdfs. For all that want to use proper note apps (not the f* edubase reader app).

## How to
1. Clone the repository
2. navigate into the repository directory with your preferred command line tool
3. run `npm install`
4. adjust the values (const variables) in the index.js (namely all that are filled with 'changethat') to your liking. don't forget the start and end page vars.
5. run `node .`
6. wait till the process finishes (or stops with an error, then you know you have to fix something).


 > I coded this only to fulfill a purpose. I didn't invest time to 'make it nice' or optimise it in any way. One or multiple parts of the script may break over time due to changes in the edupage website. If you fix them, please share your improvements either in your own repository or via pull request to this one. Thanks and enjoy!

 ## Code overview for faster understanding
 The script is very simple and consists of two parts. The first part is about the login. It essentially navigates to the login page, utilizes the auto focus on the form fields to fill them and hits enter afterwards. The second part is a bit more complicated: It navigates to the page (in case of the first one by going to the url and in all other cases by hitting the next button) in a loop and generates and stores for each page a pdf of its print version (which looks quite nice).



