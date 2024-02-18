const logout = async (req, res) => {
    try {
        const token = await req.cookies.token;
        res.clearCookie("token", token)
        res.send("success")
    } catch (error) {
        console.log(error)
    }
}
module.exports = logout