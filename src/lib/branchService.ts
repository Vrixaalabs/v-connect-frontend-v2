class BranchService {
  private static instance: BranchService;
  private readonly BRANCH_KEY = 'currentBranchId';

  private constructor() {}

  static getInstance(): BranchService {
    if (!BranchService.instance) {
      BranchService.instance = new BranchService();
    }
    return BranchService.instance;
  }

  getCurrentBranchId(): string | null {
    return localStorage.getItem(this.BRANCH_KEY);
  }

  setCurrentBranchId(branchId: string): void {
    localStorage.setItem(this.BRANCH_KEY, branchId);
  }

  clearCurrentBranchId(): void {
    localStorage.removeItem(this.BRANCH_KEY);
  }

  // This method will be used during login to determine which branchId to send
  getStoredOrDefaultBranchId(): string | null {
    return this.getCurrentBranchId();
  }
}

export default BranchService;
