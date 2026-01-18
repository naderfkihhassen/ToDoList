# ✅ Kanban Todo List

A feature-rich task management application with a Kanban-style board interface. Organize your tasks with drag-and-drop, category filters, priority levels, and visual statistics to boost your productivity.

## ✨ Features

- 📋 **Kanban Board** - Visualize tasks in columns (To Do, In Progress, Done)
- 🎯 **Drag & Drop** - Easily move tasks between columns
- 🏷️ **Category Filters** - Organize tasks by categories (Work, Personal, Shopping, etc.)
- ⭐ **Priority Levels** - Mark tasks as Low, Medium, or High priority
- ⏰ **Due Date Tracking** - Set deadlines and get overdue notifications
- 📊 **Statistics Dashboard** - Visual charts showing task completion and distribution
- 💾 **Auto-Save** - Tasks persist in browser localStorage
- 🎨 **Color Coding** - Visual indicators for priority and status
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🚀 Live Demo

[**Try it here →**](https://naderfkihhassen.github.io/ToDoList/)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox & Grid
- **JavaScript (ES6+)** - Core functionality
- **LocalStorage API** - Data persistence
- **Drag and Drop API** - Task movement functionality

## 💻 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/naderfkihhassen/ToDoList.git
   cd ToDoList
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

3. **Start organizing your tasks!**

## 🎯 How to Use

### Adding Tasks
1. Click the **"Add Task"** button
2. Enter task title and description
3. Select category and priority
4. Set due date (optional)
5. Click **"Create"**

### Managing Tasks
- **Move tasks**: Drag and drop between columns
- **Edit tasks**: Click on a task to edit details
- **Delete tasks**: Click the delete icon
- **Mark complete**: Drag to "Done" column or use checkbox

### Filtering & Sorting
- Filter by category using the dropdown menu
- View only high-priority tasks
- See overdue tasks with red indicators
- Sort by due date or priority

### Statistics
- View completion percentage
- See task distribution by category
- Track overdue tasks
- Monitor productivity trends

## 📁 Project Structure

```
ToDoList/
├── index.html          # Main HTML structure
├── style.css           # Styles and animations
├── script.js           # Application logic
├── assets/            # Images and icons (if any)
└── README.md          # Documentation
```

## 🎨 Features Breakdown

### 1. Kanban Board Layout
Three columns representing task workflow:
- **To Do** - Tasks waiting to be started
- **In Progress** - Tasks currently being worked on
- **Done** - Completed tasks

### 2. Category System
Pre-defined categories:
- 💼 Work
- 🏠 Personal
- 🛒 Shopping
- 💪 Health
- 📚 Learning
- ➕ Custom categories

### 3. Priority System
- 🔴 **High** - Urgent and important tasks
- 🟡 **Medium** - Regular priority tasks
- 🟢 **Low** - Tasks that can wait

### 4. Due Date Management
- Set specific due dates
- Visual indicators for approaching deadlines
- Automatic overdue marking
- Date-based sorting

### 5. Statistics Dashboard
Real-time metrics including:
- Total tasks
- Completed tasks percentage
- Tasks by category
- Overdue tasks count

## 💾 Data Persistence

All your tasks are automatically saved in your browser's localStorage. This means:
- ✅ Tasks persist after closing the browser
- ✅ No account or login required
- ✅ Data stays on your device
- ⚠️ Clearing browser data will delete tasks

## 🔧 Customization

You can easily customize:
- **Categories**: Edit the categories array in `script.js`
- **Colors**: Modify CSS variables in `style.css`
- **Columns**: Add or remove columns in the Kanban board
- **Priority Levels**: Adjust priority settings

## 🌟 Future Enhancements

Potential features to add:
- [ ] Task search functionality
- [ ] Subtasks and checklists
- [ ] Task labels/tags
- [ ] Export tasks to CSV/JSON
- [ ] Dark mode toggle
- [ ] Task templates
- [ ] Collaboration features

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 🐛 Known Issues

If you encounter any bugs, please [open an issue](https://github.com/naderfkihhassen/ToDoList/issues).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Nader Fkih Hassen**

- GitHub: [@naderfkihhassen](https://github.com/naderfkihhassen)
- LinkedIn: [Nader Fkih Hassen](https://linkedin.com/in/nader-fkih-hassen)
- Portfolio: [naderfkihhassen.github.io/Portfolio](https://naderfkihhassen.github.io/Portfolio/)

## 🙏 Acknowledgments

- Inspired by productivity tools like Trello and Notion
- Icons from [Font Awesome](https://fontawesome.com/) (if you used them)

## 📧 Contact

Questions or suggestions? Reach out at: naderfkihhassen@gmail.com

---

⭐️ If this project helped you stay organized, please give it a star!
