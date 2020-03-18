# Ref
https://xuanthulab.net/cac-lenh-git-co-ban-lam-viec-voi-repository.html
https://xuanthulab.net/lam-viec-voi-nhanh-branch-tao-nhanh-gop-nhanh-trong-git.html


# Git config
git config --global user.name "John Doe"
git config --global user.email "john@example.com"  //Địa chỉ email nên giống với cái đã sử dụng để tạo tài khoản Github của bạn.

--global được sử dụng để áp dụng cho tất cả các projects. Nếu bạn ko sử dụng --global thì settings sẽ chỉ dùng cho riêng project đó.

# Giúp Git bỏ qua file modes
cd project/
git config core.filemode false

Câu lệnh trên hữu dụng khi chúng ta không cần quan tâm đến quyền truy cập files (ví dụ như khi sử dụng Windows).

# Liệt kê những settings đang sử dụng
git config --list

# Khởi tạo Git repo cho code có sẵn
cd existing-project/
git init

# Clone một remote repo
git clone https://github.com/user/repository.git

Câu lệnh trên sẽ tạo một thư mục mới có tên giống trên của repo.

# Clone một remote repo tại thư mục hiện tại
git clone https://github.com/user/repository.git .

# Xem thông tin trợ giúp cho một câu lệnh git
git help clone

# Update và merge branch hiện tại với một remote repo
cd repo/
git pull origin master

với origin là remote repo, master là remote branch.

Nếu bạn không muốn merge những thay đổi của bạn, hãy sử dụng git fetch

# Liệt kê các remote urls
git remote -v

# Thay đổi origin url
git remote set-url origin https://github.com/repo.git

# Thêm remote repo
git remote add remote-name https://github.com/user/repo.git

# Xem thay đổi (chưa đc add) của những file hiện tại
git diff

# Xem thay đổi (đã được add, chưa commit)
git diff --cached

# Xem thay đổi giữa local mà master
git diff origin/master

# Xem thay đổi giữa hai commits
git diff COMMIT1_ID COMMIT2_ID

# Xem những files thay đổi giữa hai commits
git diff --name-only COMMIT1_ID COMMIT2_ID

# Xem những files thay đổi tại một commit bất kỳ
git diff-tree -no-commit-id --name-only -r COMMIT_ID

hoặc

git show --pretty="format:" --name-only COMMIT_ID

# Xem thay đổi trước khi push
git diff --cached origin/master

# Xem thông tin cụ thể của một commit
git show COMMIT_ID

# Kiểm tra status của working tree
git status

# Tạo vài thay đổi, rồi commit
git add changed_file.txt
git add folder-with-changed-files/
git commit -m "Commiting changes"

# Đổi tên/Di chuyển/Xoá files
git rm removeme.txt tmp/crap.txt
git mv file oldname.txt file_newname.txt
git commit -m "deleteing 2 files, renaming 1"

# Đổi message của commit cuối
git commit --amend -m "New commit mesage"

# Push local commits sang nhánh remote
git push origin master

# Xem commit history
git log

# Xem commit history cho hai commits gần nhất
git log -2

# Xem commit history cho hai commits gần nhất, bao gồm cả thay đổi
git log -p -2

# Xem commit history dưới dạng một dòng
git log --pretty=oneline

# Revert một commit rồi push
git revert COMMIT_ID
git push origin master

# Revert đến thời điểm trước một commit
git reset COMMIT_ID
git reset --soft HEAD@{1}
git commit -m "Revert to COMMIT_ID"
git reset --hard

# Undo commit gần nhất, vẫn giữ thay đổi ở local
git reset --soft HEAD~1

# Undo commit gần nhất, không giữ thay đổi ở local
git reset --hard HEAD~1

# Undo commit gần nhất, vẫn giữ thay đổi ở index
git reset --mixed HEAD~1

hoặc

git reset HEAD~1

# Undo commits chưa push
git reset origin/master

# Reset về trạng thái của remote
git fetch origin
git reset --hard origin/master

# Xem các nhánh local
git branch

# Xem tất cả các nhánh
git branch -a

# Tạo một patch
git diff > patch-issue-1.patch

# Thêm một file rồi tạo patch
git add newfile
git diff --staged > patch-issue-2.patch

# Thêm một file, thay đổi rồi tạo patch
git add newfile
git diff HEAD > patch-issue-2.patch

# Tạo patch từ một commit
git format-patch COMMIT_ID

# Tạo patch từ hai commit cuối
git format-patch HEAD~2

# Tạo patch từ tất cả những commits chưa push
git format-patch origin/master

# Tạo patch chứa dữ liệu nhị phân
git format-patch --binary --full-index origin/master

# Apply một patch
git apply -v patch-name.patch

# Apply một patch được tạo bằng format-patch
git am patch1.patch

# Tạo một tag
git tag 7.x-1.3

# Push một tag
git push origin 7.x-1.3

# Tạo một nhánh
git checkout master
git branch new-branch-name

Lưu ý với hai câu lệnh trên thì chúng ta chưa chuyển sang nhánh mới, mà vẫn ở nhánh master. Phải sử dụng thêm `git checkout new-branch-name` để chuyển nhánh.

Ngoài ra có thể tạo nhánh mới và chuyển sang luôn bằng 1 câu: `git checkout -b new-branch-name`
Chuyển nhánh:
`git checkout new-branch-name`

# Xem commit history so với branch hiện tại
git cherry -v master

master ở đây là branch mà bạn muốn so sánh

# Merge commit từ branch khác
git checkout master
git merge branch-name

Ở đây chúng ta merge các commits của branch-name vào master.

# Merge branch mà không commit
git merge branch-name --no-commit --no-ff

# Xem thay đổi giữa state hiện tại và một branch
git diff branch-name

# Xem thay đổi trong một file, giữa state hiện tại và một branch
git diff branch-name path/to/file

# Xoá branch
git branch -d branch-name

# Push lên một branch
git push origin branch-name

# Lấy tất cả các branches
git fetch orgin

# Lấy thư mục root
git rev-parse --show-toplevel

# Xoá các file bị xoá ở local trên repo
git rm $(git ls-files --deleted)

# Xoá toàn bộ các files chưa đc track
git clean -f

# xoá cả folder:
git clean -f -d

# xem các file trước khi xoá:
git clean -n -f -d

# Unstage các files
git reset HEAD file.txt

# Xem tag gần nhất
git describe --tags `git rev-list --tag --max-count=1`

# Liệt kê các nhánh theo trình tự sử dụng gần nhất
git for-each-ref --sort=-committerdate refs/heads/ | head

# Tar cả project, ngoại trừ thư mục .git
cd ..
tar cJf project.tar.xz project/ --exclude-vcs

# Tar tất cả các files bị thay đổi ở local
git diff --name-only | xargs tar -cf project.tar -T -

# Tìm conflict
grep -H -r "<<<" *
grep -H -r ">>>" *
grep -H -r '^=======$' *

# Apply một patch không sử dụng git
patch < file.patch

# Untrack files already added to git repository based on .gitignore
Step 1: Commit all your changes
Before proceeding, make sure all your changes are committed, including your .gitignore file.

Step 2: Remove everything from the repository
    git rm -r --cached .

Step 3: Re add everything
    git add .

Step 4: Commit
    git commit -m ".gitignore fix"

# TAG : Su dung in action
- Tag là chức năng đặt tên một cách đơn giản của Git, nó cho phép ta xác định một cách rõ ràng các phiên bản mã nguồn (code) của dự án. Ta có thể coi tag như một branch không thay đổi được. Một khi nó được tạo (gắn với 1 commit cụ thể) thì ta không thể thay đổi lịch sử commit ấy được nữa.
- Có 2 loại tag là annotated và lightweight:
    + Lightweight tag thực chất chỉ là đánh dấu (bookmark) cho một commit, vì chúng chỉ lưu trữ hàm băm (hash) của commit mà chúng tham chiếu. Chúng được tạo chỉ gồm tên mà không có các tùy chọn -a, -s hoặc -m và không chứa bất kỳ thông tin bổ sung nào.
    Để tạo một lightweight tag có tên "v1.0.0" cho Head commit hiện tại ta dùng lệnh sau: `git tag v1.0.0`

    + Annotated tag thì mạnh hơn. Ngoài tên nó còn có thể lưu trữ dữ liệu bổ sung như Tên tác giả (-s), tin nhắn (-m: message), và ngày dưới dạng các đối tượng đầy đủ trong cơ sở dữ liệu Git. Tất cả thông tin ấy quan trọng cho việc release dự án của ta.
    Lệnh tạo annotated tag có tên "v1.0.0" với thông điệp release như sau (chú thích -a nghĩa là anotated, -m nghĩa là message): 
    `git tag -a v1.0.0 -m "Releasing version v1.0.0"`
- Một số lệnh thông dụng với tag trong Git:
    + Liệt kê -n tag đầu của toàn bộ danh sách tagg: `$ git tag -l -n3`
    + Thông tin chi tiết tag: `git show v1.0`
    + Thêm tag cho các commit cũ:
    Để xem mã checksum của các lần commit trước đó: `git log --pretty=oneline`
    ex: `git tag -a v0.0 6904d -m "Tag for inintial commit"`
    + Sửa tag
    Nếu ta tạo một tag mới trùng tên (ví dụ 'v1.0') với tag đã có thì Git sẽ bắn ngoại lệ "fatal: tag 'v1.0' already exists".
    Thay vì xóa tag đó và tạo lại tag khác, đơn giản ta thay thế nó trong khi vẫn giữ mô tả tag. Chọn commit_id trong lịch sử commit của ta mà ta muốn tag (cũ) dời đến và thêm tùy chọn -f hay -force vào lệnh git của tag: `git tag -a -f <tag_identifier> <commit_id>`
    + Xóa tag
    Nói chung thì ta không có lý do gì phải xóa tag vì tag không chiếm nhiều tài nguyên. Chừ trường hợp ta đã tạo tag cho một commit sai, khi ấy mới cần xóa tag.
    `git tag -d <tag_identifier>`
    Trường hợp tag đó đã được push khi đó ta cần xóa nó từ remote repository như sau: `git push origin :v1.0`
    + Công khai (public) tag
    Giống như commit, khi tag được tạo ra nó luôn ở local repository. Nó không thể tự động push lên remote repository mà ta phải push nó.
    Đẩy toàn bộ tag ở local lên remote repository: `git push --tags`
    Đẩy riêng một tag lên remote repo: `git push <location> <tag_identifier>`
    ex: `git push origin v1.0`

# Branch: in action

# Làm việc với Local Repo
`git status` :trạng thái của Repo
`git status -s` :trạng thái của Repo ngắn gọn
`git clone path` :sao chép một Repository có địa chỉ là path
`git add` :cập nhật vào staged
`git add filename` :thêm file vào staged
`git add *.c` :file có phần mở rộng .c
`git add -A `:thêm mọi thứ có sự thay đổi (file mới, xóa file, nội dung thay đổi ...)
`git add .` :thêm mọi thứ trừ loại xóa file
`git add - `:thêm mọi thứ trừ file mới
`git commit -m "Thông báo ..."` :commit mới
`git commit --amend -m "Thông báo ..."` :commit + cập nhật vào commit cuối
`git log` :lịch sử commit
`git log -4` :lịch sử 4 commit
`git log -4 -p` :lịch sử 4 commit + chi tiết thay đổi
`git log --pretty=oneline` :Hiện thị trực quan trên 1 dòng
`git diff` :Xem sự khác biệt giữa thư mục làm việc và staged
`git diff --staged` :Xem sự khác biệt giữa staged và commit cuối
`git rm filename` :xóa file
`git reset HEAD filename` :hủy thay đổi của file
`git checkout -- filename` :khôi phục thay đổi của file
`git checkout [hash] filename` :khôi phục từ commit có mã hash
`git checkout [hash] .` :khôi phục các file từ commit có mã hash
`git clean -d -fx .` :Xóa các file không được theo dõi, có ích khi muốn xóa bỏ nhanh các file không được theo dõi

# Làm việc với Remote Repo
`git remote` :xem các Remote
`git remote -v` :xem các Remote
`git remote add name_remote addr_remote` :thêm một Remote vào Local
`git fetch name_remote` :cập nhật Local Repo từ Remote Repo
`git pull name_remote name_branch` :cập nhật Local Repo từ Remote Repo
`git push name_remote name_branch` :cập nhật Local Repo từ Remote Repo
`git remote show name_remote` :xem thông tin về Remote
`git remote rename abc xyz` :đổi tên Remote

# Làm việc với Tag
`git tag` :xem danh sách tag
`git tag -a tagname -m "Ghi chú"` :tạo tag cho commit hiện tại
`git tag -a tagname -m "Ghi chú" hash` :tạo tag cho commit cũ
`git show tagname` :thông tin về commit có tagname
`git push origin tagname` :cập nhận lên remote tất cả tagname
`git push origin --tags` :cập nhận lên remote tất cả tag
`git checkout tagname` :về phiên bản commit có tagname
`git checkout -b newbranchname tagname` :tạo nhánh mới từ phiên bản tagname
`git push --delete origin tagname` :xóa tag ở remote
`git tag -d tagname` :xóa tag ở local

# Làm việc với nhánh (branch)
`git branch` :liệt kê các nhánh
`git branch -v` :liệt kê các nhánh + commit cuối
`git branch --merged` :các nhánh gộp vào nhánh này
`git branch --no-merged` :các nhánh không gộp vào nhánh này
`git branch branchname` :tạo nhánh mới
`git checkout -b branchname` :tạo nhánh mới, khi đang đứng ở một snapshot cũ
`git checkout branchname` :chuyển nhánh
`git merge branchname` :gộp nhánh với nhánh hiện tại
`git base branchname` :gộp nhánh với nhánh hiện tại
`git mergetool` :công cụ trực quan xử lý xung đột merge
`git branch -d branchname` :xóa nhánh

# Xóa lịch sử toàn bộ commit trên nhánh : master
git checkout master                                 # chuyển về nhánh master
git checkout --orphan temp_branch                   # tạo nhánh temp_branch không chứa lịch sử commit
git add -A                                          # thêm các file vào nhánh
git commit -am "Init"                               # commit đầu tiên
git branch -D master                                # xóa nhánh master
git branch -m master                                # đổi tên nhánh hiện tại (temp_branch) thành master
git push -f origin master                           # push thay đổi lên Remote

# .gitignore : Đánh dấu file, folder ma ko track





