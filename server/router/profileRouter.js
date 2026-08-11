import express from 'express';
import Profile from '../model/Profile.js';
import User from '../model/User.js';
import multer from 'multer';
const router = express.Router();

// Get profile by user ID
router.get("/profil/:id_user", async (req, res) => {
    try {
        const profile = await Profile.findOne({ id_user: req.params.id_user });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create or update profile
// store image url directly in avatar and cover_photo fields on storage service

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });


router.post(
  "/profil",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover_photo", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        bio,
        address,
        phone,
        home,
        workplace,
        education,
        id_user
      } = req.body;

      if (!id_user) {
        return res.status(400).json({ message: "id_user is required" });
      }

      const avatarPath = req.files?.avatar
        ? `/uploads/${req.files.avatar[0].filename}`
        : null;

      const coverPath = req.files?.cover_photo
        ? `/uploads/${req.files.cover_photo[0].filename}`
        : null;

      let profile = await Profile.findOne({ id_user });

      if (profile) {
        // update
        profile.first_name = first_name ?? profile.first_name;
        profile.last_name = last_name ?? profile.last_name;
        profile.bio = bio ?? profile.bio;
        profile.address = address ?? profile.address;
        profile.phone = phone ?? profile.phone;
        profile.home = home ?? profile.home;
        profile.workplace = workplace ?? profile.workplace;
        profile.education = education ?? profile.education;

        if (avatarPath) profile.avatar = avatarPath;
        if (coverPath) profile.cover_photo = coverPath;
      } else {
        // create
        profile = new Profile({
          first_name,
          last_name,
          bio,
          address,
          phone,
          home,
          workplace,
          education,
          id_user,
          avatar: avatarPath,
          cover_photo: coverPath
        });
      }

      await profile.save();
      res.status(201).json(profile);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);


// Update profile by ID
router.put('/profil/:id_profile', async (req, res) => {
    try {
        const id_profile = req.params.id_profile;
        const updateData = req.body;

        const updatedProfile = await Profile.findByIdAndUpdate(
            id_profile,
            updateData,
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
