import { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { Institute } from '@/types/institute';

const SuperAdminInstitutesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [newInstitute, setNewInstitute] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
  });

  // TODO: Replace with actual API call
  const institutes: Institute[] = [];

  const handleCreateInstitute = async () => {
    // TODO: Implement institute creation
    setIsCreateModalOpen(false);
  };

  const handleDeleteInstitute = async (institute: Institute) => {
    // TODO: Implement institute deletion
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          placeholder="Search institutes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create New Institute
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Students</th>
              <th>Departments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {institutes.map((institute) => (
              <tr key={institute.id}>
                <td>{institute.name}</td>
                <td>{institute.location}</td>
                <td>{institute.studentsCount}</td>
                <td>{institute.departments.length}</td>
                <td>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedInstitute(institute)}
                    >
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteInstitute(institute)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Create Institute Modal */}
      <Dialog
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Create New Institute</h2>
          
          <div className="space-y-4">
            <div>
              <Label>Institute Name</Label>
              <Input
                value={newInstitute.name}
                onChange={(e) => setNewInstitute({ ...newInstitute, name: e.target.value })}
                placeholder="Enter institute name"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={newInstitute.description}
                onChange={(e) => setNewInstitute({ ...newInstitute, description: e.target.value })}
                placeholder="Enter institute description"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={newInstitute.location}
                onChange={(e) => setNewInstitute({ ...newInstitute, location: e.target.value })}
                placeholder="Enter institute location"
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                value={newInstitute.website}
                onChange={(e) => setNewInstitute({ ...newInstitute, website: e.target.value })}
                placeholder="Enter institute website"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateInstitute}>
                Create Institute
              </Button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* View Institute Modal */}
      <Dialog
        open={!!selectedInstitute}
        onOpenChange={() => setSelectedInstitute(null)}
      >
        {selectedInstitute && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedInstitute.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Description:</label>
                <p>{selectedInstitute.description}</p>
              </div>
              <div>
                <label className="font-semibold">Location:</label>
                <p>{selectedInstitute.location}</p>
              </div>
              <div>
                <label className="font-semibold">Website:</label>
                <p>{selectedInstitute.website}</p>
              </div>
              <div>
                <label className="font-semibold">Students:</label>
                <p>{selectedInstitute.studentsCount}</p>
              </div>
              <div>
                <label className="font-semibold">Departments:</label>
                <ul className="list-disc list-inside">
                  {selectedInstitute.departments.map((dept) => (
                    <li key={dept.id}>{dept.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default SuperAdminInstitutesPage;
