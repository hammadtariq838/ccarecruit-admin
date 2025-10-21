import { fetchUsersOnServer } from "@/requests/server/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function UsersPage() {
  const users = await fetchUsersOnServer();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
      </div>
      <div className="my-4">
        <Table>
          <TableHeader>
            <TableRow>
              {users.length > 0 &&
                Object.keys(users[0]).map((key) => (
                  <TableHead key={key}>
                    {key
                      // insert space before capital letters
                      .replace(/([A-Z])/g, " $1")
                      // capitalize first letter
                      .replace(/^./, (str) => str.toUpperCase())}
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {Object.values(user).map((value, index) => (
                  <TableCell key={index}>{value?.toString()}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
