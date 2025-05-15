const API_BASE_URL = 'https://3vmzeeor55.execute-api.eu-west-1.amazonaws.com/Prod';

export interface Budget {
  budget_id: number;
  client_id: string;
  category: string;
  amount: string;
  cycle: string;
  created: string;
}

export interface CreateBudgetRequest {
  client_id: string;
  category: string;
  amount: string;
  cycle: string;
}

export const fetchBudgets = async (clientId: string): Promise<Budget[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budgets/${clientId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch budgets');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching budgets:', error);
    throw error;
  }
};

export const createBudget = async (budget: CreateBudgetRequest): Promise<Budget> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(budget),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create budget');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating budget:', error);
    throw error;
  }
};
