import fs, { readdirSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // remove .md and get the id
        const id = fileName.replace(/\.md$/, '')

        // read markdown file as a string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        //use gray matter to parse the front matter
        const matterResults = matter(fileContents)
        console.log(matterResults.data)

        //combine front matter with id
        return{
            id,
            ...matterResults.data
        }
    })

    //sort the posts according to time
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}