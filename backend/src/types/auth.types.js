/**
 * @param {AuthRequest} req
 * @param {import('express').Response} res
 */
const getProfile = (req, res) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
  
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
      },
    });
  };
  