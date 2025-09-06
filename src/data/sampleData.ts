// Sample data for ChaiPaani app

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: User[];
  createdAt: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  groupId: string;
  splitAmong: string[];
  date: string;
  category?: string;
}

export interface Balance {
  userId: string;
  userName: string;
  amount: number; // positive means they owe you, negative means you owe them
}

// Sample users
export const sampleUsers: User[] = [
  { id: "1", name: "Arjun Mehta", email: "arjun@example.com" },
  { id: "2", name: "Priya Sharma", email: "priya@example.com" },
  { id: "3", name: "Rahul Verma", email: "rahul@example.com" },
  { id: "4", name: "Kavya Nair", email: "kavya@example.com" },
  { id: "5", name: "Siddharth Roy", email: "sid@example.com" },
];

// Sample groups
export const sampleGroups: Group[] = [
  {
    id: "1",
    name: "Goa Trip 2024",
    description: "Beach vacation expenses",
    members: [sampleUsers[0], sampleUsers[1], sampleUsers[2], sampleUsers[3]],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Office Lunch Squad",
    description: "Daily lunch expenses",
    members: [sampleUsers[0], sampleUsers[2], sampleUsers[4]],
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    name: "Roommate Expenses",
    description: "Shared apartment costs",
    members: [sampleUsers[0], sampleUsers[1]],
    createdAt: "2024-01-01",
  },
];

// Sample expenses
export const sampleExpenses: Expense[] = [
  {
    id: "1",
    description: "Beach Resort Booking",
    amount: 8000,
    paidBy: "1",
    groupId: "1",
    splitAmong: ["1", "2", "3", "4"],
    date: "2024-01-20",
    category: "Accommodation",
  },
  {
    id: "2",
    description: "Seafood Dinner",
    amount: 1200,
    paidBy: "2",
    groupId: "1",
    splitAmong: ["1", "2", "3", "4"],
    date: "2024-01-21",
    category: "Food",
  },
  {
    id: "3",
    description: "Taxi to Airport",
    amount: 800,
    paidBy: "1",
    groupId: "1",
    splitAmong: ["1", "2", "3", "4"],
    date: "2024-01-25",
    category: "Transport",
  },
  {
    id: "4",
    description: "Lunch at Cafe Delhi Heights",
    amount: 450,
    paidBy: "4",
    groupId: "2",
    splitAmong: ["1", "2", "4"],
    date: "2024-02-05",
    category: "Food",
  },
  {
    id: "5",
    description: "Electricity Bill",
    amount: 2400,
    paidBy: "2",
    groupId: "3",
    splitAmong: ["1", "2"],
    date: "2024-02-01",
    category: "Utilities",
  },
  {
    id: "6",
    description: "Grocery Shopping",
    amount: 850,
    paidBy: "1",
    groupId: "3",
    splitAmong: ["1", "2"],
    date: "2024-02-03",
    category: "Groceries",
  },
];

// Calculate balances for a user
export const calculateUserBalance = (userId: string): number => {
  let totalBalance = 0;

  sampleExpenses.forEach((expense) => {
    const splitAmount = expense.amount / expense.splitAmong.length;
    
    if (expense.paidBy === userId) {
      // User paid, so others owe them
      totalBalance += expense.amount - splitAmount;
    } else if (expense.splitAmong.includes(userId)) {
      // User owes their share
      totalBalance -= splitAmount;
    }
  });

  return totalBalance;
};

// Calculate balances between users in a group
export const calculateGroupBalances = (groupId: string): Balance[] => {
  const group = sampleGroups.find((g) => g.id === groupId);
  if (!group) return [];

  const groupExpenses = sampleExpenses.filter((e) => e.groupId === groupId);
  const balances: { [key: string]: number } = {};

  // Initialize balances
  group.members.forEach((member) => {
    balances[member.id] = 0;
  });

  // Calculate balances
  groupExpenses.forEach((expense) => {
    const splitAmount = expense.amount / expense.splitAmong.length;
    
    // Add to payer's balance
    balances[expense.paidBy] += expense.amount - splitAmount;
    
    // Subtract from each person's balance
    expense.splitAmong.forEach((userId) => {
      if (userId !== expense.paidBy) {
        balances[userId] -= splitAmount;
      }
    });
  });

  // Convert to Balance array
  return Object.entries(balances)
    .filter(([_, amount]) => amount !== 0)
    .map(([userId, amount]) => ({
      userId,
      userName: sampleUsers.find((u) => u.id === userId)?.name || "Unknown",
      amount,
    }));
};

// Get expenses for a specific group
export const getGroupExpenses = (groupId: string): Expense[] => {
  return sampleExpenses
    .filter((e) => e.groupId === groupId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Format currency in Indian Rupees
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};