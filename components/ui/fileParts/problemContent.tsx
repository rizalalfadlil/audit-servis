
export const ProblemContent = ({
  problems,
}: {
  problems: { name: string; level: string }[];
}) => {
  return (
    problems.length > 0 && (
      <>
        <div>
          <p className="text-lg font-bold">Masalah yang ditemukan</p>
          <p className="text-xs">
            berikut ini adalah masalah yang kami temukan selama pemeriksaan
          </p>
        </div>
        <table className="border *:border **:border **:p-1">
          <thead>
            <tr className="font-bold">
              <th>Nama</th>
              <th>Kerusakan</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={index}>
                <td>{problem.name}</td>
                <td>{problem.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
};