import parser from '../../src/parser'

export default async (req, res) => {
    const data = await parser()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}