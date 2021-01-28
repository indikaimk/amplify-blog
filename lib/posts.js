import fs, { readdirSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // remove .md and get the id
        const id = fileName.replace(/\.md$/, '')

        // read markdown file as a string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

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

//return an array of post IDs
export function getAllPostIds() {
    const postFiles = fs.readdirSync(postsDirectory)
    return postFiles.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    //extract the front matter
    const matterResult = matter(fileContents)

    //use remark to convert markdown to HTML
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}