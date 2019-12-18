import React from 'react'
import Layout from '../components/Layout'

const About = () => (
    <Layout>
        <h3>What we need?</h3>
        <p>We want to implement a new system to manage a bunch of to-do items with
            customized color and name, grouped in several lists with different names and colors, the user
            could be able to create new to-do items and drag them into the desired list, or moving them
            from one list to another.</p>
        <p>Lists could be movable and stackable. Order of lists should be persisted.</p>
        <h3>How to use it</h3>
        <ul>
            <li>Mock API done with <a href="https://www.mocky.io/" rel="nofollow">https://www.mocky.io/</a></li>
            <li>Responsively designed for Desktop, Ipad and Iphone</li>
        </ul>
    </Layout>
)

export default About
