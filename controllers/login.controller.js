export const login_page = async (req, res) => {
    try {
        res.render('auth/login');
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};