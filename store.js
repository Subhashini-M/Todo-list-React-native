import create from 'zustand';

const useStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (index) => set((state) => ({ todos: state.todos.filter((_, i) => i !== index) })),
  editTodo: (index, newText) => set((state) => ({
    todos: state.todos.map((todo, i) => i === index ? { ...todo, text: newText } : todo)
  })),
}));

export default useStore;
