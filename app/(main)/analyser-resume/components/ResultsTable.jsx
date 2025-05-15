export default function ResultsTable({ results }) {
  // Add null check for results
  if (!results || results.length === 0) {
    return <div className="text-white text-center py-4">No results available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-dark-900 border border-dark-800 text-white">
        <thead>
          <tr>
            {[
              'Candidate Name',
              'ATS Score',
              'Match Status',
              'Experience',
              'Skills Match',
              'Key Skills'
            ].map((heading, i) => (
              <th
                key={i}
                className="px-6 py-3 border-b border-dark-800 bg-dark-950 text-left text-xs font-semibold uppercase tracking-wider text-secondary-400"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            // Handle both old and new result formats
            const name = result.candidateProfile?.name || result.name || "Unknown";
            const atsScore = result.overallEvaluation?.atsScore || result.atsScore || 0;
            const isMatch = result.overallEvaluation?.isMatch || result.isMatch || false;
            const yearsExp = result.candidateProfile?.yearsOfExperience || "N/A";
            const skillsMatch = result.technicalSkills?.skillsMatchPercentage || "N/A";
            const skills = result.technicalSkills?.matchingSkills || result.keySkills || [];

            return (
              <tr key={index} className={index % 2 === 0 ? 'bg-dark-950' : 'bg-dark-900'}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-dark-800 text-white">{name}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-dark-800">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-white">{atsScore}</span>
                    <div className="ml-2 w-16 bg-dark-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          atsScore >= 75 ? 'bg-primary-500' :
                          atsScore >= 50 ? 'bg-primary-600' : 'bg-error-500'
                        }`}
                        style={{ width: `${atsScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-dark-800">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      isMatch
                        ? 'bg-primary-900/30 text-primary-300 border border-primary-800'
                        : 'bg-error-900/30 text-error-300 border border-error-800'
                    }`}
                  >
                    {isMatch ? 'Good Match' : 'Not a Match'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-dark-800 text-white">
                  {yearsExp} {typeof yearsExp === 'number' ? 'years' : ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-dark-800 text-white">
                  {typeof skillsMatch === 'number' ? `${skillsMatch}%` : skillsMatch}
                </td>
                <td className="px-6 py-4 border-b border-dark-800">
                  <div className="text-sm">
                    {Array.isArray(skills) && skills.length > 0 ? (
                      skills.map((skill, i) => (
                        <span key={i} className="inline-block bg-dark-800 border border-dark-700 rounded-lg px-3 py-1 text-xs font-medium text-secondary-400 mr-2 mb-2 transition-colors duration-200 hover:bg-dark-700">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-secondary-400">No skills found</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}