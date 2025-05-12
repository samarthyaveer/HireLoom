export default function ResultsTable({ results }) {
  // Add null check for results
  if (!results || results.length === 0) {
    return <div className="text-white text-center py-4">No results available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900 border border-gray-700 text-white">
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
                className="px-6 py-3 border-b border-gray-600 bg-gray-800 text-left text-xs font-semibold uppercase tracking-wider"
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
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700">{name}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{atsScore}</span>
                    <div className="ml-2 w-16 bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          atsScore >= 75 ? 'bg-green-500' :
                          atsScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${atsScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${isMatch ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}
                  >
                    {isMatch ? 'Good Match' : 'Not a Match'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700">
                  {yearsExp} {typeof yearsExp === 'number' ? 'years' : ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700">
                  {typeof skillsMatch === 'number' ? `${skillsMatch}%` : skillsMatch}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  <div className="text-sm">
                    {Array.isArray(skills) ? (
                      skills.map((skill, i) => (
                        <span key={i} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-xs font-semibold text-gray-300 mr-2 mb-2">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">No skills found</span>
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