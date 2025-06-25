
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const courseAPIs = [
  {
    name: 'FreeCodeCamp',
    url: 'https://api.freecodecamp.org/api/curriculum',
    parser: (data: any) => data.curriculum?.map((course: any) => ({
      title: course.title,
      description: course.description,
      url: `https://freecodecamp.org/learn/${course.slug}`,
      type: 'Programming',
      level: 'Beginner',
      language: 'English'
    })) || []
  },
  {
    name: 'Coursera',
    url: 'https://api.coursera.org/api/courses.v1/courses?limit=50&fields=name,description,slug',
    parser: (data: any) => data.elements?.map((course: any) => ({
      title: course.name,
      description: course.description,
      url: `https://coursera.org/learn/${course.slug}`,
      type: 'General',
      level: 'Mixed',
      language: 'English'
    })) || []
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting automated course fetching...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const allCourses = [];

    // Fetch from multiple sources
    for (const api of courseAPIs) {
      try {
        console.log(`Fetching from ${api.name}...`);
        const response = await fetch(api.url, {
          headers: {
            'User-Agent': 'RiverSkills-Bot/1.0',
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const courses = api.parser(data);
          allCourses.push(...courses);
          console.log(`Fetched ${courses.length} courses from ${api.name}`);
        } else {
          console.error(`Failed to fetch from ${api.name}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error fetching from ${api.name}:`, error);
        continue;
      }
    }

    // Add curated courses to ensure quality content
    const curatedCourses = [
      {
        title: "Complete Web Development Bootcamp",
        description: "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB",
        url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
        type: "Web Development",
        level: "Beginner",
        language: "English"
      },
      {
        title: "Python for Data Science",
        description: "Master Python programming for data analysis and machine learning",
        url: "https://www.coursera.org/learn/python-data-analysis",
        type: "Data Science",
        level: "Intermediate",
        language: "English"
      },
      {
        title: "React Complete Course",
        description: "Build modern web applications with React and Redux",
        url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
        type: "Frontend",
        level: "Intermediate",
        language: "English"
      },
      {
        title: "Machine Learning A-Z",
        description: "Hands-on Python & R in Data Science",
        url: "https://www.udemy.com/course/machinelearning/",
        type: "AI/ML",
        level: "Advanced",
        language: "English"
      },
      {
        title: "Digital Marketing Course",
        description: "Complete digital marketing strategy course",
        url: "https://www.coursera.org/learn/digital-marketing",
        type: "Marketing",
        level: "Beginner",
        language: "English"
      }
    ];

    allCourses.push(...curatedCourses);

    // Store in database
    if (allCourses.length > 0) {
      const { data, error } = await supabase
        .from('courses')
        .upsert(allCourses.map(course => ({
          ...course,
          fetched_at: new Date().toISOString(),
          source: 'auto-fetch'
        })), { 
          onConflict: 'title,url',
          ignoreDuplicates: true 
        });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log(`Successfully stored ${allCourses.length} courses`);
    }

    return new Response(JSON.stringify({
      success: true,
      coursesFound: allCourses.length,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in auto-fetch-courses:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
