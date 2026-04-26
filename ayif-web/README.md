ayub1599
ayubmd5412@gmail.com

# Configure git globally (one time only)
git config --global user.name "ayub1599"
git config --global user.email "ayubmd5412@gmail.com"

# Initialize git repository in root
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: AYIF B2B Grocery Platform"

# Add remote repository
git remote add origin https://github.com/ayub1599/Ayif.git

# Set main branch and push
git branch -M main
git push -u origin main
