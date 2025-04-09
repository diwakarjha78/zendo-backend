export const redirect_if_authenticated = (req, res, next) => {
  const cookie = req.cookies.zendo_user;
  if (cookie) {
    try {
      const user = JSON.parse(cookie);
      if (user?.zendo_at) {
        return res.redirect('/');
      }
    } catch (err) {
      console.error('Error parsing cookie:', err);
      return res.redirect('/auth/login');
    }
  }
  next();
};

export const is_authenticated = (req, res, next) => {
  const cookie = req.cookies.zendo_user;
  if (!cookie) {
    return res.redirect('/auth/login');
  }
  try {
    const user = JSON.parse(cookie);
    if (!user?.zendo_at) {
      return res.redirect('/auth/login');
    }
  } catch (err) {
    console.error('Error parsing cookie:', err);
    return res.redirect('/auth/login');
  }
  next();
};
