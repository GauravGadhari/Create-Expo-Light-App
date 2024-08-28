import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import os
import json
import shutil


class ExpoAppCreator:
    def __init__(self, root):
        self.root = root
        self.root.title("Create Light Expo App")

        # Directory for template files
        self.template_dir = "template"

        # Create GUI elements
        self.create_widgets()

    def create_widgets(self):
        # Style configuration
        style = ttk.Style()
        style.configure('TLabel', font=('Segoe UI', 12))
        style.configure('TButton', font=('Segoe UI', 12), padding=10)
        style.configure('TEntry', font=('Segoe UI', 12), padding=10)
        style.configure('TProgressbar', thickness=30, troughcolor='lightgrey', background='royalblue')

        # App Name Entry
        ttk.Label(self.root, text="App Name:").grid(row=0, column=0, padx=10, pady=10, sticky='w')
        self.app_name_entry = ttk.Entry(self.root)
        self.app_name_entry.grid(row=0, column=1, padx=10, pady=10, sticky='ew')

        # Select Directory Button
        ttk.Label(self.root, text="Select File Location:").grid(row=1, column=0, padx=10, pady=10, sticky='w')
        self.directory_label = ttk.Label(self.root, text="No directory selected")
        self.directory_label.grid(row=1, column=1, padx=10, pady=10, sticky='ew')
        ttk.Button(self.root, text="Browse", command=self.select_directory).grid(row=1, column=2, padx=10, pady=10)

        # Create Button
        ttk.Button(self.root, text="Create App", command=self.create_app).grid(row=2, column=0, columnspan=3, padx=10, pady=10)

        # Progress Bar
        self.progress = ttk.Progressbar(self.root, mode='indeterminate')
        self.progress.grid(row=3, column=0, columnspan=3, padx=10, pady=10, sticky='ew')

        self.root.columnconfigure(1, weight=1)

    def select_directory(self):
        self.directory = filedialog.askdirectory()
        if self.directory:
            self.directory_label.config(text=self.directory)

    def create_app(self):
        self.app_name = self.app_name_entry.get()
        if not self.app_name or not hasattr(self, "directory"):
            messagebox.showerror("Error", "Please enter an app name and select a directory.")
            return

        app_dir = os.path.join(self.directory, self.app_name)
        if os.path.exists(app_dir):
            messagebox.showerror("Error", "Directory already exists.")
            return

        os.makedirs(app_dir)

        # Show progress bar
        self.progress.start()

        # Simulate file copying and app creation
        self.root.after(100, self.copy_files, app_dir)

    def copy_files(self, app_dir):
        try:
            if os.path.exists(self.template_dir):
                shutil.copytree(self.template_dir, app_dir, dirs_exist_ok=True)

            # Create app.json
            app_json_content = {
                "expo": {
                    "name": self.app_name,
                    "slug": self.app_name.lower().replace(" ", "-"),
                    "version": "1.0.0",
                    "orientation": "portrait",
                    "icon": "./assets/images/icon.png",
                    "scheme": "myapp",
                    "userInterfaceStyle": "automatic",
                    "splash": {
                        "image": "./assets/images/splash.png",
                        "resizeMode": "cover",
                        "backgroundColor": "#000000",
                    },
                    "android": {
                        "adaptiveIcon": {
                            "foregroundImage": "./assets/images/adaptive-icon.png",
                            "backgroundColor": "#ffffff",
                        },
                        "package": f"com.light.{self.app_name.lower().replace(' ', '-')}",
                        "permissions": [
                            "android.permission.READ_CONTACTS",
                            "android.permission.WRITE_CONTACTS",
                            "android.permission.READ_EXTERNAL_STORAGE",
                            "android.permission.WRITE_EXTERNAL_STORAGE",
                            "android.permission.READ_CONTACTS",
                            "android.permission.WRITE_CONTACTS",
                            "android.permission.RECORD_AUDIO",
                        ],
                    },
                    "web": {
                        "bundler": "metro",
                        "output": "static",
                        "favicon": "./assets/images/favicon.png",
                    },
                    "plugins": ["expo-router", "expo-contacts", "expo-image-picker"],
                },
            }
            with open(os.path.join(app_dir, "app.json"), "w") as f:
                json.dump(app_json_content, f, indent=2)

            # Stop progress bar
            self.progress.stop()
            messagebox.showinfo("Success", f"Expo app '{self.app_name}' created successfully!")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {e}")
            self.progress.stop()

if __name__ == "__main__":
    root = tk.Tk()
    app = ExpoAppCreator(root)
    root.mainloop()
